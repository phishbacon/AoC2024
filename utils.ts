export function ReadTextFile(): Promise<string> {
  const error: Error = new Error();
  const stackLines: Array<string> = (error.stack ?? "").split("\n");
  const callerLine: string = stackLines[stackLines.length - 1] ?? "";
  const match: RegExpMatchArray | null = callerLine.match(/file:\/\/(.*?):\d+:\d+/);
  if (!match) {
    throw new Error("Couldn't parse the caller's path from the stack trace.")
  }

  const callerPath: string = match[1] ?? "";
  const callerFileName: string = (callerPath.split("/").pop() ?? "").split(".")[0] ?? "";
  const targetInputFileName: string = callerFileName + ".txt";

  try {
    return Deno.readTextFile(`inputs/${targetInputFileName}`);
  } catch (error) {
    throw error;
  }
}