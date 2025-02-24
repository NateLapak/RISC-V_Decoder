/*
    This file takes the funct3 of an instruction and it's instruction type to determine
    its RISC-V instruction
*/

const determineInstruct = (funct3:number, instructType:number, funct7:number ) => {

    let RISCV_Instruction:string = "";

    const RTypeInstruction = () => {

        switch (funct3) {

            case 0b000:
                if (funct7 == 0) {
                    RISCV_Instruction = "add";
                }

                else {
                    RISCV_Instruction = "sub";
                }

                break;

            case 0b001:
                RISCV_Instruction = "Sll";
                break;

            case 0b010:
                RISCV_Instruction = "Slt";
                break;

            case 0b011:
                RISCV_Instruction = "Sltu";
                break;

            case 0b100:
                RISCV_Instruction = "Xor";
                break;

            // Need to differentiate srli and srai
            case 0b101:
                if (funct7 == 0) {
                    RISCV_Instruction = "Srl";
                }

                else {
                    RISCV_Instruction = "sra";
                }
                break;

            case 0b110:
                RISCV_Instruction = "Or";
                break;

            case 0b111:
                RISCV_Instruction = "and";
                break;

            default:
                break;

        }
    
        return RISCV_Instruction;

    }

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

    }

    // Jalr is the only instruction for IType jump instructions
    const jalrInstruction = () => {
        RISCV_Instruction = "jalr";
        return RISCV_Instruction;
    }


    // Determine instructions for I-type load instructions by determining their funct3
    const ITypeLoadInstruction = () => {

        switch (funct3) {

            case 0b000:
                RISCV_Instruction = "lb";
                break;

            case 0b001:
                RISCV_Instruction = "lh";
                break;

            case 0b010:
                RISCV_Instruction = "lw";
                break;

            case 0b100:
                RISCV_Instruction = "lbu";
                break;

            case 0b101:
                RISCV_Instruction = "lhu";
                break;

            default:
                break;

        }
        return RISCV_Instruction;

    }

    const STypeInstruction = () => {

        switch (funct3) {

            case 0b000:
                RISCV_Instruction = "sb";
                break;

            case 0b001:
                RISCV_Instruction = "sh";
                break;

            case 0b010:
                RISCV_Instruction = "sw";
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
            RTypeInstruction();
            break;

        // I-type arithmetic
        case 2:
            ITypeArith();
            break;

        // I-type Load
        case 3:
            ITypeLoadInstruction();
            break;
    
        // I-type Jump
        case 4:
            jalrInstruction();
            break;

        // S-type Store
        case 5:
            STypeInstruction();
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