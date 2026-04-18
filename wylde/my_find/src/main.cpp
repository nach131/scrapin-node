#include <iostream>
#include <filesystem>
#include <string>
#include <algorithm>

bool my_find(std::string nombre_buscado)
{
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
                return true;
            }
        }
    }
    return false;
}

bool parset(std::string separar)
{
    // Buscar el carácter '@' en el string
    std::size_t pos = separar.find('@');

    if (pos != std::string::npos)
    {
        // Si encuentra '@', separar antes y después
        std::string antes = separar.substr(0, pos);
        std::string despues = separar.substr(pos + 1);

        if (my_find(antes))
            return true;
        else if (my_find(despues))
            return true;
        return false;
    }
    else
    {
        // Si no hay '@', mostrar el string completo
        return my_find(separar);
    }
}

int main(int argc, char *argv[])
{
    if (argc < 2)
    {
        std::cerr << "Uso: " << argv[0] << " <nombre_de_carpeta>" << std::endl;
        return 1;
    }

    std::string nombre_buscado = argv[1];

    if (!parset(nombre_buscado))
    {
        std::cout << "No se encontró ninguna carpeta que contenga: "
                  << nombre_buscado << std::endl;
    }

    return 0;
}
