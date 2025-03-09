/*
    This file takes a RISC-V register and finds its corresponding decimal value
*/

const findRegister = (register:string) => {

    let registerNum:number = 0;

    switch (register) {
        case "zero":
            registerNum = 0;
            break;

        case "ra":
            registerNum = 1;
            break;

        case "sp":
            registerNum = 2;
            break;

        case "gp":
            registerNum = 3;
            break;

        case "tp":
            registerNum = 4;
            break;

        case "t0":
            registerNum = 5;
            break;

        case "t1":
            registerNum = 6;
            break;

        case "t2": 
            registerNum = 7;
            break;

        case "s0":
            registerNum = 8;
            break;

        case "s1":
            registerNum = 9;
            break;

        case "a0":
            registerNum = 10;
            break;

        case "a1":
            registerNum = 11;
            break;

        case "a2":
            registerNum = 12;
            break;

        case "a3":
            registerNum = 13;
            break

        case "a4":
            registerNum = 14;
            break;

        case "a5":
            registerNum = 15;
            break

        case "a6":
            registerNum = 16;
            break;

        case "a7":
            registerNum = 17;
            break;
        
        case "s2":
            registerNum = 18;
            break;

        case "s3":
            registerNum = 19;
            break;

        case "s4":
            registerNum = 20;
            break;

        case "s5":
            registerNum = 21;
            break;

        case "s6":
            registerNum = 22;
            break;

        case "s7":
            registerNum = 23;
            break;

        case "s8":
            registerNum = 24;
            break;

        case "s9":
            registerNum = 25;
            break;

        case "s10":
            registerNum = 26;
            break;

        case "s11":
            registerNum = 27;
            break;

        case "t3":
            registerNum = 28;
            break;

        case "t4":
            registerNum = 29;
            break;

        case "t5":
            registerNum = 30;
            break;

        case "t6":
            registerNum = 31;
            break;

        default:
            break;
    }

    return registerNum;
}

export default findRegister