#include <stdio.h>

int main(int argc, char const *argv[])
{
    /* code */

    int g, s, b;
    int nums []= { 1, 2, 3, 4 };

    for (b = 1; b < 5; b++)
    {
        for (s = 1; s < 5; s++)
        {
            for (g = 1; g < 5; g++)
            {
                printf("%d,%d,%d\n", b, s, g);
            }
        }
    }

    return 0;
}
