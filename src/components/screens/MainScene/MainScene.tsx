// "use client";

// import React, { useCallback, useEffect, useState } from "react";
// import MarkupGrid, {
//   GridRowProps,
// } from "@/components/ui/GridNavigation/MarkupGrid";
// import Keyboard from "@/components/ui/Keyboard";
// import Menu from "@/components/ui/Menu";
// import { menuItems } from "@/mocks/menu";
// import { markupGridMock } from "@/mocks/titles";

// export function MainScene() {
//   const [titlesList, setTitlesList] = useState(markupGridMock);

//   useEffect(() => setTitlesList(markupGridMock), []);

//   const handleSearch = useCallback(
//     (e: string) => {
//       if (markupGridMock) {
//         const filter: GridRowProps[] =
//           markupGridMock.filter((row) =>
//             row.items?.filter((item) =>
//               item.title?.toLowerCase()?.includes(e?.toLowerCase())
//             )
//           ) ?? markupGridMock;
//         console.log("🚀 ~ Home ~ filter:", filter);
//         setTitlesList(filter);
//       }
//     },
//     [markupGridMock, titlesList, setTitlesList]
//   );

//   return (
//     <GridNavigation
//       className="relative grid grid-cols-12 gap-0"
//       onInitFocus={() => {}}
//     >
//       <GridNavigation.RowList
//         orientation="col"
//         className="focus:w-80 col-span-1 !max-w-[92px]"
//       >
//         {menuItems?.map((menu) => (
//           <GridNavigation.Item key={menu?.name} />
//         ))}
//         <Menu menuList={menuItems} />
//       </GridNavigation.RowList>

//       <GridNavigation.Section
//         id=""
//         className="flex items-start justify-start h-screen z-40 p-9 col-span-4"
//       >
//         <Keyboard onSearch={handleSearch} />
//       </GridNavigation.Section>

//       <GridNavigation.Section
//         className="relative py-16 px-8 h-screen w-full col-span-7"
//         divider
//       >
//         <MarkupGrid
//           content={titlesList}
//           itemSize={[2, 6]}
//           onInitFocus={() => {}}
//           hasFocus={false}
//         />
//       </GridNavigation.Section>
//     </GridNavigation>
//   );
// }
