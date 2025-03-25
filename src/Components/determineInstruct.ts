/*
    This file takes the funct3 of an instruction and it's instruction type to determine
    its RISC-V instruction.
*/

const determineInstruct = (funct3:number, instructType:number, funct7:number ) => {

    let RISCV_Instruction:string = "";

    const SystemInstruction = () => {

        switch (funct3) {

            case 0b001:
                RISCV_Instruction = "crssw";
                break

            case 0b010:
                RISCV_Instruction = "csrrs";
                break

            case 0b011:
                RISCV_Instruction = "csrrc";
                break

            case 0b101:
                RISCV_Instruction = "csrrwi";
                break

            case 0b110:
                RISCV_Instruction = "csrrsi"
                break

            case 0b111:
                RISCV_Instruction = "csrrci"
                break

            default:
                break;
            

        }

    }


    // R-type instructions
    const RTypeInstruction = () => {

        // Determien instruction using funct3
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
                RISCV_Instruction = "sll";
                break;

            case 0b010:
                RISCV_Instruction = "slt";
                break;

            case 0b011:
                RISCV_Instruction = "sltu";
                break;

            case 0b100:
                RISCV_Instruction = "xor";
                break;

            // Need to differentiate srli and srai
            case 0b101:
                if (funct7 == 0) {
                    RISCV_Instruction = "srl";
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

    // I-Type arithemtic instruction
    const ITypeArith = () => {
        
        switch (funct3) {

            case 0b000:
                RISCV_Instruction = "addi";
                break;

            case 0b001:
                RISCV_Instruction = "slli";
                break;

            case 0b010:
                RISCV_Instruction = "slti";
                break;

            case 0b011:
                RISCV_Instruction = "sltiu";
                break;

            case 0b100:
                RISCV_Instruction = "xori";
                break;

            // Need to differentiate srli and srai
            case 0b101:
                
                if (funct7 == 0) {
                    RISCV_Instruction = "srli";
                    break;
                }

                else {
                    RISCV_Instruction = "srai";
                    break
                }

            case 0b110:
                RISCV_Instruction = "ori";
                break;

            case 0b111:
                RISCV_Instruction = "andi";
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

    const branchInstructions = () => {
        
        switch (funct3) {

            case 0b000:
                RISCV_Instruction = "beq";
                break;

            case 0b001:
                RISCV_Instruction = "bne";
                break;

            case 0b100:
                RISCV_Instruction = "blt";
                break;

            case 0b101:
                RISCV_Instruction = "bge";
                break;

            case 0b110:
                RISCV_Instruction = "bltu";
                break;

            case 0b111:
                RISCV_Instruction = "bgeu";
                break;

            default:
                break;

        }
        return RISCV_Instruction;
    }


    // Determine instruction type
    switch (instructType) {

        // System instructions
        case 0:
            SystemInstruction();
            break

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
            branchInstructions();
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