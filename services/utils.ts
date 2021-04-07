import { Stream } from "stream"

export function streamToString(stream: Stream) {
  console.log("h", stream)

  const chunks: any[] = []
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => {
      console.log(chunk)
      chunks.push(Buffer.from(chunk))
    })
    stream.on("error", (err) => reject(err))
    stream.on("end", () =>
      resolve(Buffer.concat(chunks).toString("utf8"))
    )
  })
}
