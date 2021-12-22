import { getConfig } from "../../lib/local/config";

export default function commandList() {
  const projects = getConfig().projects;
  console.table(Object.values(projects))
}