/*
    This file takes the funct3 of an instruction and it's instruction type to determine
    its RISC-V instruction
*/

const determineInstruct = (funct3:number, instructType:number) => {

    let RISCV_Instruction:string = "";

    const ITypeArith = () => {
        
        switch (funct3) {

            case 0b000:
                RISCV_Instruction = "addi";
                break;

            case 0b001:
                RISCV_Instruction = "Slli";
                break;

            case 0b010:
                RISCV_Instruction = "Slti";
                break;

            case 0b011:
                RISCV_Instruction = "Sltiu";
                break;

            case 0b100:
                RISCV_Instruction = "Xori";
                break;

            // Need to differentiate srli and srai
            case 0b101:
                RISCV_Instruction = "Srli";
                break;

            case 0b110:
                RISCV_Instruction = "Ori";
                break;

            case 0b111:
                RISCV_Instruction = "111";
                break;

            default:
                break;

        }

        return RISCV_Instruction;

    }


    // Determine instruction type
    switch (instructType) {

        // R-Type instruction
        case 1:
 
            break;

        // I-type arithmetic
        case 2:
            ITypeArith();
            break;

        // I-type Load
        case 3:
            break;
    
        // I-type Jump
        case 4:
            break;

        // S-type Store
        case 5:
            break;
        
        // SB-type
        case 6:
            break;

        // U-type
        case 7:
            break;
        
        // U-type
        case 8:
            break;

        // J-type
        case 9:
            break;

        default:
            break;

    }

    return RISCV_Instruction;
}

export default determineInstruct