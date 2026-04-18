#include <iostream>
#include <filesystem>
#include <string>
#include <algorithm>

int main(int argc, char *argv[])
{
    if (argc < 2)
    {
        std::cerr << "Uso: " << argv[0] << " <nombre_de_carpeta>" << std::endl;
        return 1;
    }

    std::string nombre_buscado = argv[1];
    bool encontrado = false;

    // Función para convertir a minúsculas
    auto a_minusculas = [](const std::string &s)
    {
        std::string resultado = s;
        std::transform(resultado.begin(), resultado.end(), resultado.begin(), ::tolower);
        return resultado;
    };

    std::string buscado_lower = a_minusculas(nombre_buscado);

    // Recorremos el directorio actual y todos sus subdirectorios
    for (const auto &entry : std::filesystem::recursive_directory_iterator("."))
    {
        if (entry.is_directory())
        {
            std::string nombre = entry.path().filename().string();
            std::string nombre_lower = a_minusculas(nombre);

            if (nombre_lower.find(buscado_lower) != std::string::npos)
            {
                std::cout << entry.path().string() << std::endl;
                encontrado = true;
            }
        }
    }

    if (!encontrado)
    {
        std::cout << "No se encontró ninguna carpeta que contenga: "
                  << nombre_buscado << std::endl;
    }

    return 0;
}
