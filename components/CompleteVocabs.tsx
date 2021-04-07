import { vocabularies } from "@zazuko/rdf-vocabularies";
import { rdf, rdfs, skos } from "@tpluscode/rdf-ns-builders";
import ext from "rdf-ext";
// import {rdf} from "@zazuko/rdf-vocabularies/datasets"
import clownface from "clownface";
import React from "react";
import { useAsync } from "react-async-hook";
import { DatasetCore } from "rdf-js";

import FlexSearch, { Index } from "flexsearch";

interface RDFDocument {
  label?: string;
  comment?: string;
  prefLabel?: string;
  notation?: string;
  id?: number;
}

function toDoc(dataset: DatasetCore): RDFDocument {
  const cf = clownface({ dataset });
  return {
    label: cf.out(rdfs.label).value,
    comment: cf.out(rdfs.comment).value,
    prefLabel: cf.out(skos.prefLabel).value,
    notation: cf.out(skos.notation).value,
  };
}

const idx: Index<RDFDocument> = FlexSearch.create({
  doc: {
    id: "id",
    field: ["label", "comment", "prefLabel", "notation"],
  },
});

// async function search(s: string): Promise {
//     return new Promise((resolve, reject) => idx.search(s, undefined, ))
// }

async function getVocabs() {
  const out = await vocabularies({ only: ["schema"] });
  // const v = out[1]
  console.log(out);

  const cf = clownface({ dataset: out.schema });
  // const cf = ""
  console.log(cf);

  const hs = cf.has(rdf.type, rdf.Property);

  const docs = hs.values.map((v) => {
    let s = out.schema.match(ext.namedNode(v));
    // console.log(streamToString(s));

    return toDoc(s);
  });
  console.log(docs);

  let n = 0;
  for (const doc of docs) {
    doc.id = n;
    idx.add(doc);
    n++;
  }

//   console.log(idx.export());

  console.log(await idx.search("name"));

  console.log(hs.out(rdfs.label).values);
}

export default function CompleteVocabs() {
  const status = useAsync(getVocabs, []);
  if (status.result) {
  }
  return <div>{/* {status} */}</div>;
}
