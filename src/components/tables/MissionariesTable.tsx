import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Toggle from "../ui/toggle/Toggle";
import {Link} from "react-router";
import { useState } from "react";

interface Missionary {
  id: number;
  description: string,
  family: string;
  user: {
    name: string;
    email: string;
  };
  address: string;
  status: string;
  img: string;
}

export const missionaries: Missionary[] = [
  {
    id: 1,
    family: "Goins Family",
    description: "Familia fundadora",
    user: {
      name: "Bobby Goins",
      email: "bobby@gmail.com",
    },
    address: "Arizona",
    status: "Active",
    img: "https://bautista-iglesia.vercel.app/assets/IMG-20250530-WA0056-CSCPfhX6.jpg"
  },
  {
    id: 2,
    family: "George Family",
    description: "Familia que apoya nuestra iglesia",
    user: {
      name: "Kaiya George",
      email: "Kaiya@gmail.com",
    },
    address: "Arizona",
    status: "Inactive",
    img: "https://bautista-iglesia.vercel.app/assets/IMG-20250530-WA0056-CSCPfhX6.jpg"
  },
  {
    id: 3,
    family: "Geidt Family",
    description: "Familia que apoya nuestra iglesia",
    user: {
      name: "Zain Geidt",
      email: "Geidt@gmail.com",
    },
    address: "Mexico City",
    status: "Inactive",
    img: "https://bautista-iglesia.vercel.app/assets/IMG-20250530-WA0056-CSCPfhX6.jpg"
  },
  {
    id: 4,
    family: "Abram Family",
    description: "Familia que apoya nuestra iglesia",
    user: {
      name: "Abram Schleifer",
      email: "Abram@gmail.com",
    },
    address: "Europa",
    status: "Active",
    img: "https://bautista-iglesia.vercel.app/assets/IMG-20250530-WA0056-CSCPfhX6.jpg",
  },
  {
    id: 5,
    family: "George Family",
    description: "Familia que apoya nuestra iglesia",
    user: {
      name: "Carla George",
      email: "Carla@gmail.com",
    },
    address: "Europa",
    status: "Active",
    img: "https://bautista-iglesia.vercel.app/assets/IMG-20250530-WA0056-CSCPfhX6.jpg",
  },
];

export default function MissionariesTable() {
  const [missionariesData, setMissionariesData] = useState(missionaries);

  const handleStatusChange = (id: number, isActive: boolean) => {
    setMissionariesData(prevData => 
      prevData.map(missionary => 
        missionary.id === id 
          ? { ...missionary, status: isActive ? "Active" : "Inactive" }
          : missionary
      )
    );
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Familia
              </TableCell>
              <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Contacto
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Ubicación
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Estado
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {missionariesData.map((missionary) => (
              <TableRow key={missionary.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Link to={`/missionaries/${missionary.id}`} className="hover:text-brand-500">
                    {missionary.family}
                  </Link>
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {missionary.user.name}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {missionary.user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {missionary.address}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Toggle 
                      isActive={missionary.status === "Active"}
                      onChange={(isActive) => handleStatusChange(missionary.id, isActive)}
                    />
                    <span className="text-theme-xs">
                      {missionary.status === "Active" ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
