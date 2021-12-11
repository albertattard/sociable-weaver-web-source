export interface Chapter {
  entries: Entry[];
  chapterPath: string;
  bookPath: string;
}

export interface Entry {
  type: string;
  id: string;
  name: string;
  workingDirectory: string;
  parameters: string[];
  variables: string[];
  values: { [name: string]: string };
  ignoreErrors: boolean;
  pushChanges: boolean;
  dryRun: boolean;
  visible: boolean;
  sensitive: boolean;
  expectedExitValue: number;
  commandTimeout: number;
}

export interface VariableInitialised {
  name: string;
  value: string;
}

export interface VariableUpdated extends VariableInitialised {
  previousValue: string;
}

export function setValue(entry: Entry, update: VariableInitialised): void {
  if (entry.variables !== undefined && entry.variables.indexOf(update.name) > -1) {
    if (entry.values === undefined) {
      entry.values = {};
    }
    entry.values[update.name] = update.value;
  }
}
