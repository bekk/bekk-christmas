import Iframe from "sanity-plugin-iframe-pane";
import resolveProductionUrl from "./resolveProductionUrl";
import { DefaultDocumentNodeResolver, StructureResolver } from "sanity/desk";
import { SanityDocument } from "sanity";

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  switch (schemaType) {
    case "post":
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: SanityDocument) => resolveProductionUrl(doc),
          })
          .title("Preview"),
      ]);
    default:
      return S.document().views([S.view.form()]);
  }
};

const structureResolver: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("post"),
      S.documentTypeListItem("author"),
      S.documentTypeListItem("tag"),
      S.documentTypeListItem("page"),
    ]);

export default structureResolver;
