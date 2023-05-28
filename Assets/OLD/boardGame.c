#include<stdio.h>
#include<stdlib.h>
#include<time.h>

#define SIZE 64;

typedef struct casa {
    int indice;
    int estado;//(0==ainda não mostrado, 1==em questão, 2==acertado, 3==errado)
    char col;
    int fil;
} casas;

typedef struct resul {
    int acertos;
    int erros;
} Resultado;

void printHome(void)
{
    system("clear || cls");
    printf("\n\n\n\n");
    printf("\t\t\t#==================================#\n");
    printf("\t\t\t#  BEM VINDO AO JOGO DO TABULEIRO! #\n");
    printf("\t\t\t#¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨#\n");
    printf("\t\t\t#  Esse jogo foi desenvolvido por  #\n");
    printf("\t\t\t#  Vinícius Peruzzi, no intuíto    #\n");
    printf("\t\t\t#  de permitir ao jogador decorar  #\n");
    printf("\t\t\t#  com mais facilidade as casas do #\n");
    printf("\t\t\t#  tabuleiro de xadrez. Basta      #\n");
    printf("\t\t\t#  digitar a casa que for mostrada #\n");
    printf("\t\t\t#  conforme o jogo for acontecendo.#\n");
    printf("\t\t\t#  Divirta-se! E visite meu github #\n");
    printf("\t\t\t#     www.github.com/Vinigperuzi   #\n");
    printf("\t\t\t#==================================#\n");
}

void setBoardInfo(casas *arrayCasas, int size)
{
    for (int i = 0; i<size; i++){
        arrayCasas[i].indice = i+1;
        arrayCasas[i].estado = 0;
        int prov = i%8;//(a==0, b==1, c==2...)
        arrayCasas[i].fil = (int)(i/8) + 1;
        switch (prov)
        {
        case 0:
            arrayCasas[i].col = 'a';
            break;
        case 1:
            arrayCasas[i].col = 'b';
            break;
        case 2:
            arrayCasas[i].col = 'c';
            break;
        case 3:
            arrayCasas[i].col = 'd';
            break;
        case 4:
            arrayCasas[i].col = 'e';
            break;
        case 5:
            arrayCasas[i].col = 'f';
            break;
        case 6:
            arrayCasas[i].col = 'g';
            break;
        case 7:
            arrayCasas[i].col = 'h';
            break;
        
        default:
            break;
        }
    }
}

void shuffle(casas *array, int size)
{
    int novaPos;
    int aux;
    for(int i = 0; i<size; i++){
        novaPos = rand()%size;
        aux = array[i].indice;
        array[i].indice = array[novaPos].indice;
        array[novaPos].indice = aux;
    }
}

void showBoard(casas *arrayCasas)
{
    system("clear || cls");

    for(int i = 7; i>=0; i--){      //Para inverter a apresentação no console
    printf("\t\t\t");
        for(int j = 0; j<8; j++){
            if (arrayCasas[(i*8)+j].estado == 0){
                printf("\033[0;33m");
                if ((i+j)%2 == 0){
                    printf("\033[40m");
                } else {
                    printf("\033[47m");
                }
                printf(" ? ");
                printf("\033[0;37m");
            } else if(arrayCasas[(i*8)+j].estado == 1){
                printf("\033[0;34m");
                if ((i+j)%2 == 0){
                    printf("\033[40m");
                } else {
                    printf("\033[47m");
                }
                printf("%2.d ", arrayCasas[(i*8)+j].indice);
                printf("\033[0;37m");
            } else if(arrayCasas[(i*8)+j].estado == 2){
                printf("\033[0;32m");
                if ((i+j)%2 == 0){
                    printf("\033[40m");
                } else {
                    printf("\033[47m");
                }
                printf(" V ");
                printf("\033[0;37m");
            } else{
                printf("\033[0;31m");
                if ((i+j)%2 == 0){
                    printf("\033[40m");
                } else {
                    printf("\033[47m");
                }
                printf(" X ");
                printf("\033[0;37m");
            }
        }
        printf("\n");
    }
    printf("\n\n");
}

Resultado game(casas *arrayCasas, int size, int modo)
{
    int valorNum;
    char valorChar;
    Resultado resultado;
    resultado.acertos = 0; resultado.erros = 0;
    for (int i = 0; i<=size; i++){
        for(int j = 0; j<size; j++){
            if(arrayCasas[j].indice == i){
                arrayCasas[j].estado = 1;
                showBoard(arrayCasas);
                printf("Informe a casa do número apresentado, no formato a4 (\"z0\" volta para o menu): \n");
                if (modo == 21){
                    printf("\n\n\t\t\t%c%d:  \n\n", arrayCasas[j].col, arrayCasas[j].fil);
                }
                valorChar = getchar();
                scanf("%d", &valorNum);
                setbuf(stdin, NULL);
                if (valorChar == 'z' && valorNum == 0){
                    return resultado;
                }
                if (valorChar == arrayCasas[j].col && valorNum == arrayCasas[j].fil){
                    arrayCasas[j].estado = 2;
                    resultado.acertos++;
                } else {
                    arrayCasas[j].estado = 3;
                    printf("\a");
                    resultado.erros++;
                }
            }
        }
    }
    return resultado;
}

void caseOne(casas *arrayCasas, int size, int modo)
{
    Resultado resultado;
    clock_t start, final;
    start = clock();
    setBoardInfo(arrayCasas, size);
    shuffle(arrayCasas, size);
    resultado = game(arrayCasas, size, modo);
    showBoard(arrayCasas);
    final = clock();
    printf("\n\n\t\tSeu tempo de jogo foi: %.2f segundos.\n\t\tE você teve %d acertos e %d erros.\n\n\n", ((float)(final - start)/100), resultado.acertos, resultado.erros);
    printf("\n\n\t\t\tPressione enter para voltar ao menu\n\n\n");
    setbuf(stdin, NULL);
    getchar();
}

int main(void)
{
    srand(time(NULL));
    casas *arrayCasas;
    int teste, numero, size = SIZE;

    if ((arrayCasas = malloc(sizeof(casas) * size)) == NULL){
        printf("\n\nErro ao alocar espaço para o tabuleiro");
    }

    printHome();
    printf("\n\n\n\t\t\tPressione enter para começar\n\n\n");
    getchar();

    int escolha;
    while(1){
        do{
            system("clear || cls");
            printf("\n\n\t\tMenu de opções:\n\n\t\t[1]. INICIAR JOGO\n\t\t[2]. EXIBIR RESULTADOS\n\t\t[3]. SAIR DO JOGO\n\n\t\t");
            scanf("%d", &escolha);
            if ((escolha < 1 || escolha > 3) && escolha != 21){
                printf("\n\n\t\t\aVocê deve escolher um valor entre 1 e 3.\n\t\tPressione enter para continuar\n\n");
                setbuf(stdin,NULL);
                getchar();
            }
        }while((escolha < 1 || escolha > 3) && escolha != 21);

        setbuf(stdin, NULL);

        switch (escolha)
        {
        case 1:
            caseOne(arrayCasas, size, 0);
            break;

        case 2:
            //Não implementado ainda
            break;

        case 3:
            system("clear || cls");
            free(arrayCasas);
            printf("\n\n\n\t\t\tO programa será encerrado!!\n\t\t\tObrigado por jogar!!\n\n\n");
            exit(0);
        case 21:
            printf("\n\n\t\t\tParabéns, você descobriu o modo debugger, a casa certa será exibida.\n\n");
            caseOne(arrayCasas, size, 21);
            break;
        }
    }
}