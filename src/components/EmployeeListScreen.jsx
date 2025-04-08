import { useState } from "react";
import { Plus, ChevronRight } from "lucide-react";
import FuncionarioCard from "./FuncionarioCard";

export default function EmployeeListScreen() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Daniel Alves da Silva",
      cpf: "123.456.789-00",
      role: "Gerente",
      status: "Ativo",
    },
    {
      id: 2,
      name: "Giselle Torres Lopes",
      cpf: "987.654.321-00",
      role: "Operador",
      status: "Inativo",
    },
    {
      id: 3,
      name: "Ana Bispo dos Santos",
      cpf: "456.789.123-00",
      role: "Operador",
      status: "Ativo",
    },
    {
      id: 4,
      name: "Regina Elisa Souza",
      cpf: "321.654.987-00",
      role: "Analista",
      status: "Ativo",
    },
  ]);

  return (
    <div className="min-h-screen p-4">
      <div className="flex flex-col items-end">
        <div className="flex gap-4">
          {/* Info Column */}
          <div className="w-1/3 h-full bg-white p-8 rounded-xl shadow">
            <p className="text-base text-mediumLightGray mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              viverra lectus non porttitor. Suspendisse at lacinia mauris nec
              arcu. Venenatis aliquam turpis. Nulla tellus. Curabitur nec massa
              dolor. Nulla rhoncus pharetra leo dapibus cursus. Praesent
              dignissim nec efficitur dui. Aliquam erat volutpat. Fusce auctor
              venenatis felis at ornare. Suspendisse potenti. Suspendisse mattis
              arcu at elit. Vitae varius magna tincidunt vel. Duis rutrum nec
              commodo nisi. Pharetra ac neque tellus eu vulputate rhoncus.
            </p>
            <div className="mt-8">
              <img src="/foto-perfil.png" alt="placeholder" />
            </div>
          </div>

          {/* Employees List */}
          <div className="w-2/3">
            <div className="bg-white rounded-xl shadow">
              {/* Header */}
              <div className="bg-greyBlue text-white p-4 rounded-t-xl flex justify-between items-center">
                <h2 className="text-2xl font-medium pl-1">Funcionário(s)</h2>
              </div>

              {/* Add Employee Button */}
              <div className="p-4 flex flex-col justify-between gap-4">
                <button className="hover:bg-mediumLightGray  py-6 text-base flex items-center w-full text-greyBlue border border-greyBlue rounded-xl justify-center focus:border-2 focus:border-greyBlue focus:outline-none">
                  <Plus className="h-5 w-5 mr-2" />
                  Adicionar Funcionário
                </button>

                <div className="flex gap-2 items-center justify-between">
                  <div className="flex gap-2">
                    <button className="text-greyBlue hover:bg-mediumLightGray px-8 py-1 text-base flex items-center  border border-greyBlue rounded-xl justify-center focus:border-2 focus:border-greyBlue focus:outline-none focus:bg-skyBlue focus:text-white">
                      Ver apenas ativos
                    </button>
                    <button className="text-mediumLightGray hover:bg-darkGreyishBlue  px-8 py-1 text-base flex items-center border border-mediumLightGray rounded-xl justify-center">
                      Limpar filtros
                    </button>
                  </div>

                  <span className="text-sm">
                    Ativos:{" "}
                    {employees.filter((emp) => emp.status === "Ativo").length}/
                    {employees.length}
                  </span>
                </div>
              </div>

              {/* Employee List */}
              <div className="p-4">
                {employees.map((employee) => (
                  <FuncionarioCard
                    key={employee.id}
                    index={employee.id}
                    nome={employee.name}
                    cpf={employee.cpf}
                    status={employee.status}
                    cargo={employee.role}
                  />
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 flex justify-end items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm">A etapa está concluída?</span>
                  <div className="flex items-center">
                    <div className="w-12 h-5 flex items-center rounded-full p-1 cursor-pointer bg-mediumLightGray">
                      <div className="w-3 h-3 rounded-full shadow-md transform bg-greyBlue "></div>
                      <span className="text-xs font-light tracking-wide text-dark ml-1">
                        Não
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          disabled={true}
          className="px-12 py-2 bg-greyBlue text-white rounded-xl text-sm mt-8 disabled:bg-darkGreyishBlue disabled:opacity-50 cursor-not-allowed"
        >
          Próximo passo
        </button>
      </div>
    </div>
  );
}
