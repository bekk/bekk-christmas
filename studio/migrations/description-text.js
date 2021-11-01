import normalizeBlock from "@sanity/block-tools/lib/util/normalizeBlock";
import convertHTMLtoPortableText from "markdown-to-sanity/src/convertHTMLtoPortableText";
import convertMDtoVFile from "markdown-to-sanity/src/convertMDtoVFile";
import sanityClient from "part:@sanity/base/client";

const client = sanityClient.withConfig({
  apiVersion: "2021-08-21",
});

const fetchDocuments = () =>
  client.fetch(
    `*[_type == 'post' && defined(complexDescription)][0...100] {_id, _rev, description, complexDescription, stringDescription}`
  );

const buildPatches = (docs) =>
  Promise.all(
    docs.map(async (doc) => ({
      id: doc._id,
      patch: {
        // set: {
        //   complexDescription: await markdownToBlockContent(
        //     doc.stringDescription || ""
        //   ),
        // },
        set: {
          description: doc.complexDescription,
    
        },
        unset: ["complexDescription"],
        // this will cause the transaction to fail if the documents has been
        // modified since it was fetched.
        ifRevisionID: doc._rev,
      },
    }))
  );

const markdownToBlockContent = async (markdown) => {
  if (typeof markdown === "string") {
    const vFile = await convertMDtoVFile(markdown);
    const portableText = convertHTMLtoPortableText(vFile.contents);
    return portableText.map((block) => normalizeBlock(block));
  } else if (Array.isArray(markdown)) {
    console.log("stringDescription is array", markdown);
    const normalized = markdown.map((block) => normalizeBlock(block));
    return normalized;
  } else {
    return [];
  }
};

const createTransaction = (patches) =>
  patches.reduce(
    (tx, patch) => tx.patch(patch.id, patch.patch),
    client.transaction()
  );

const commitTransaction = (tx) => tx.commit();

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  const patches = await buildPatches(documents);
  if (patches.length === 0) {
    console.log("No more documents to migrate!");
    return null;
  }
  console.log(
    `Migrating batch:\n %s`,
    patches
      .map((patch) => `${patch.id} => ${JSON.stringify(patch.patch)}`)
      .join("\n")
  );
  const transaction = createTransaction(patches);
  await commitTransaction(transaction);
  return migrateNextBatch();
};

migrateNextBatch().catch((err) => {
  console.error(err);
  process.exit(1);
});
