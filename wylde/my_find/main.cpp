#include <iostream>
#include <string>

int main()
{
    std::string input;
    std::cout << "Introduce una cadena: ";
    std::cin >> input;

    // Buscar el carácter '@' en el string
    std::size_t pos = input.find('@');

    if (pos != std::string::npos)
    {
        // Si encuentra '@', separar antes y después
        std::string antes = input.substr(0, pos);
        std::string despues = input.substr(pos + 1);

        std::cout << "Parte antes de '@': " << antes << std::endl;
        std::cout << "Parte despues de '@': " << despues << std::endl;
    }
    else
    {
        // Si no hay '@', mostrar el string completo
        std::cout << "Cadena sin '@': " << input << std::endl;
    }

    return 0;
}
