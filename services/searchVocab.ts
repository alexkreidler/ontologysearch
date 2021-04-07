import { vocabularies, shrink } from "@zazuko/rdf-vocabularies"
import { rdf, rdfs, skos } from "@tpluscode/rdf-ns-builders"
import rdfExt from "rdf-ext"
import clownface from "clownface"
import { DatasetCore, NamedNode } from "rdf-js"

import FlexSearch, { Index } from "flexsearch"

/** This is a simple representation of the fields of an RDF node/entity
 * that our search service will search. It also includes the IRI to identify
 * the result of the search
 */
export interface RDFDocument {
  label?: string
  comment?: string
  prefLabel?: string
  notation?: string
  id?: number
  iri?: string
  withPrefix?: string
}

function toDoc(dataset: DatasetCore, term: NamedNode): RDFDocument {
  const cf = clownface({ dataset, term })
  return {
    label: cf.out(rdfs.label).value,
    comment: cf.out(rdfs.comment).value,
    prefLabel: cf.out(skos.prefLabel).value,
    notation: cf.out(skos.notation).value,
    iri: term.value,
    withPrefix: shrink(term.value),
  }
}

const idx: Index<RDFDocument> = FlexSearch.create({
  doc: {
    id: "id",
    field: ["label", "comment", "prefLabel", "notation"],
  },
})

export async function createVocabIndex(
  vocabs: string[]
): Promise<Index<RDFDocument>> {
  console.log("Creating indexes for vocabs", vocabs)

  const out = await vocabularies({ only: vocabs })

  let n = 0
  for (const key in out) {
    if (Object.prototype.hasOwnProperty.call(out, key)) {
      const element = out[key]

      const cf = clownface({ dataset: element })

      const docs = [
        cf.has(rdf.type, rdf.Property).values,

        cf.has(rdf.type, rdfs.Class).values,
      ]
        .flat()
        .map((v) => {
          const node = rdfExt.namedNode(v)
          return toDoc(element.match(node), node)
        })

      for (const doc of docs) {
        doc.id = n
        idx.add(doc)
        n++
      }
    }
  }

  return idx
}
