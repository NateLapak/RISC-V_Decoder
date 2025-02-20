/*
    This file converts the decimal number of a register into it's RISC-V register
*/

const determineRegister = (registerNum:number) => {

    let register:string = "";

    switch (registerNum) {
        case 0:
            register = "zero";
            break;

        case 1:
            register = "ra";
            break;

        case 2:
            register = "sp";
            break;

        case 3:
            register = "gp";
            break;

        case 4:
            register = "tp";
            break;

        case 5:
            register = "t0";
            break;

        case 6:
            register = "t1";
            break;

        case 7: 
            register = "t2";
            break;

        case 8:
            register = "s0";
            break;

        case 9:
            register = "s1";
            break;

        case 10:
            register = "a0";
            break;

        case 11:
            register = "a1";
            break;

        case 12:
            register = "a2";
            break;

        case 13:
            register = "a3";
            break

        case 14:
            register = "a4";
            break;

        case 15:
            register = "a5";
            break

        case 16:
            register = "a6";
            break;

        case 17:
            register = "a7";
            break;
        
        case 18:
            register = "s2";
            break;

        case 19:
            register = "s3";
            break;

        case 20:
            register = "s4";
            break;

        case 21:
            register = "s5";
            break;

        case 22:
            register = "s6";
            break;

        case 23:
            register = "s7";
            break;

        case 24:
            register = "s8";
            break;

        case 25:
            register = "s9";
            break;

        case 26:
            register = "s10";
            break;

        case 27:
            register = "s11";
            break;

        case 28:
            register = "t3";
            break;

        case 29:
            register = "t4";
            break;

        case 30:
            register = "t5";
            break;

        case 31:
            register = "t6";
            break;

        default:
            register = "";
            break;
    }

    return register;
}

export default determineRegister