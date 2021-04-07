import { vocabularies } from "@zazuko/rdf-vocabularies";
import { rdf, rdfs } from "@tpluscode/rdf-ns-builders";
import ext from "rdf-ext";
// import {rdf} from "@zazuko/rdf-vocabularies/datasets"
import clownface from "clownface";
import React from "react";
import { useAsync } from "react-async-hook";
import { Stream, Quad } from "rdf-js";
import { JsonLdSerializer } from "jsonld-streaming-serializer";
import { streamToString } from "../services/utils";
import SerializerJsonld from "@rdfjs/serializer-jsonld";
import { Transform } from "stream";
// const dataFactory = require("@rdfjs/data-model");
// const mySerializer = new JsonLdSerializer({ space: "  " });

class ToJSONStrings extends Transform {
  _transform(chunk: any, enc: string, cb: () => void) {
      var upperChunk = JSON.stringify(chunk)
      console.log("t", upperChunk);
      
    this.push(upperChunk);
    cb();
  }
}

const mySerializer = new SerializerJsonld();

async function toDoc(ds: Stream<Quad>) {
  console.log(ds);

  mySerializer.import(ds);
  console.log(mySerializer);

  const tj = new ToJSONStrings()
  console.log("NOPE");
  mySerializer.pipe(tj)
  console.log("tj", tj);
  
  

  const out = await streamToString(tj);
  console.log(out);
  return out;
}

async function getVocabs() {
  const out = await vocabularies({ only: ["rdfs", "rdf"] });
  // const v = out[1]
  console.log(out);

  const cf = clownface({ dataset: out.rdfs });
  // const cf = ""
  console.log(cf);

  const hs = cf.has(rdf.type, rdf.Property);

  console.log(
    await Promise.all(
      hs.values.map((v) => {
        let s = out.rdfs.match(ext.namedNode(v)).toStream();
        // console.log(streamToString(s));

        return toDoc(s);
      })
    )
  );

  console.log(hs.out(rdfs.label).values);
}

export default function CompleteVocabs() {
  const status = useAsync(getVocabs, []);
  if (status.result) {
  }
  return <div>{/* {status} */}</div>;
}
