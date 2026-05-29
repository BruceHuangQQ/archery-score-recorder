// "use client";

// import { Checkbox } from "@/components/ui/checkbox";
// import { data, User } from "@/lib/data";
// import {
//   createColumnHelper
// } from "@tanstack/react-table";

// import DefaultHeader from "@/components/default-header";
import { ModeToggle } from "@/components/theme-mode-toggle";
import { getRounds } from "./actions/rounds";
import { getArchers } from "./actions/archers";
import { getCompetitions } from "./actions/competitions";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { MoreVertical } from "lucide-react";
// import { DataTable } from "@/components/data-table";

// const columnHelper = createColumnHelper<User>();

// const columns = [
//   columnHelper.display({
//     id: "action",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   }),
//   columnHelper.accessor("firstName", {
//     header: (info) => <DefaultHeader info={info} name="First Name" />,
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor("lastName", {
//     header: (info) => <DefaultHeader info={info} name="Last Name" />,
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor("email", {
//     header: (info) => <DefaultHeader info={info} name="Email" />,
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor("age", {
//     header: (info) => <DefaultHeader info={info} name="Age" />,
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor("comments", {
//     header: (info) => <DefaultHeader info={info} name="Comments" />,
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.display({
//     id: "more",
//     cell: () => {
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant={"ghost"} className="h-8 w-8">
//               <MoreVertical className="w-4 h-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             align="end"
//             className=""
//             onCloseAutoFocus={(e) => e.preventDefault()}
//           >
//             <DropdownMenuLabel className="">Actions</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem className="">Copy</DropdownMenuItem>
//             <DropdownMenuItem>Paste</DropdownMenuItem>
//             <DropdownMenuItem>Cut</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//     enableSorting: false,
//     enableHiding: false,
//   }),
// ];

const rounds = await getRounds();
const competitions = await getCompetitions()
const archers = await getArchers()

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-start p-10 gap-4">
      <ModeToggle />
      {/* <DataTable<User, any> columns={columns} data={data} /> */}
      <pre>{JSON.stringify(competitions, null, 2)}</pre>
      <pre>{JSON.stringify(archers, null, 2)}</pre>
    </div>
  );
}

