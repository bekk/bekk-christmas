import Iframe from "sanity-plugin-iframe-pane";
import resolveProductionUrl from "./resolveProductionUrl";

export const getDefaultDocumentNode = (S) => {
  return S.document().views([
    S.view.form(),
    S.view
      .component(Iframe)
      .options({
        url: (doc) => resolveProductionUrl(doc),
      })
      .title("Preview"),
  ]);
};

export default (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("post"),
      S.documentTypeListItem("author"),
      S.documentTypeListItem("tag"),
      S.documentTypeListItem("page"),
    ]);
