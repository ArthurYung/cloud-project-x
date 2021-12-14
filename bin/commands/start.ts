import { watchConfigJson } from "../../lib/local/config";
import { serverStart } from "../../lib/server/server";

export default function commandStart() {
  serverStart();
  watchConfigJson();
}