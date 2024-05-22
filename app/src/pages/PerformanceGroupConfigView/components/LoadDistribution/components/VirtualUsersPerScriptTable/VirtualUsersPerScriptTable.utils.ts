import { TableColumns } from "./VirtualUsersPerScriptTable.types";

export const headerLabels = [
    {label: "Script", key: TableColumns.script},
    {label: "Steps", key: TableColumns.steps},
    {label: "VUs", key: TableColumns.vus, isChangable: true},
    {label: "Load", key: TableColumns.load},
    {label: "Databanks Mapped", key: TableColumns.databanks},
    {label: "Geography", key: TableColumns.geography},
]
