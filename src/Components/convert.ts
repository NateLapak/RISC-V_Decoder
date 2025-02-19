const convert = (instruction: string) => {

    // Instruction is not a valid hex or binary number, return Invalid
    if (!instruction) return "Invalid input";

    let result:string = "";

    let opcode:string = "";
    let instructionType:string = "";

    // If instruction was given in hexadecimal, convert to binary
    const convertToBinary = (instruction: string) => {

        let binary_num: number = +instruction;
        return binary_num.toString(2);
    }

    // Determine type of RISC-V instruction.
    const determineOpcode = (instruction:string) => {

        // Convert string to number
        let new_num:number = +instruction;

        // Mask the lowest 7 bits that represent the opcode
        let getOpcode:number = new_num & 0x7F;

        // Adjust opcode so that it fits into 7 bits all the time
        let adjustNum: string = getOpcode.toString(2).padStart(7, '0');
        
        return adjustNum
    }

    // Determine type of RISC-V instruction (I-type, R-type, S-type, etc)
    const determineType = (instruction:string, opcode:string) => {

        /*
            R-type = 1
            I-type arithmetic = 2 
            I-type Load = 3
            I-type Jump = 4
            S-type Store = 5
            SB-type (branch instruct) = 6
            U-type (Load Upper Immediate) = 7
            U-type (AUPIC) = 8
            J-type (JAL) = 9
            Default = 10
        */

        let new_instruction:string = "";

        // Determine type using opcode
        switch (opcode) {
            case "00110011":
                new_instruction = RType(instruction);
                break;

            case "0010011":
                new_instruction = ITypeArithmetic(instruction);
                break;

            case "0000011":
                new_instruction = ITypeLoad(instruction)
                break;

            case "1100111":
                new_instruction = ITypeJump(instruction);
                break;

            case "0100011":
                new_instruction = STypeStore(instruction);
                break;

            case "1100011":
                new_instruction = SBType(instruction);
                break;

            case "0110111":
                new_instruction = UTypeLUI(instruction)
                break;

            case "0010111":
                new_instruction = UTypeAUPIC(instruction);
                break;

            case "1101111":
                new_instruction = JType(instruction);
                break;

            default:
                break;

        }
        return new_instruction;
    }

    // R-type instructions
    const RType = (instruction:string) => {
        return instruction;
    }
    
    // I-Type Arithmetic instruction
    const ITypeArithmetic = (instruction:string) => {

        let new_num = +instruction;
        let temp: string = "";

        // Get rd
        let getRD:number = new_num >> 7
        getRD = getRD & 0xF;

        // Get funct3
        let getfunct3:number = new_num >> 12;
        getfunct3 = getfunct3 & 0x7;

        // Get rs1
        let getrs1:number = new_num >> 15;
        getrs1 = getrs1 & 0xF;

        // Get immediate
        let getimm:number = new_num >> 20;
        getimm = getimm & 0xFFF;


    
        return instruction;
    }


    // I-Type Load instruction
    const ITypeLoad = (instruction:string) => {
        return instruction;

    }

    // I-Type Jump instruction
    const ITypeJump = (instruction:string) => {
        return instruction;
    }

    // S-type Store instruction
    const STypeStore = (instruction:string) => {
        return instruction;
    }

    // Branch instruction
    const SBType = (instruction:string) => {
        return instruction;
    }

    // U-Type Load Upper Immediate (LUI)
    const UTypeLUI = (instruction:string) => {
        return instruction;
    }

    // U-type Add Upper Immediate to PC
    const UTypeAUPIC = (instruction:string) => {
        return instruction;
    }

    // Jump and Link instruction
    const JType = (instruction:string) => {
        return instruction;
    }

    // Input is in binary, 
    if (instruction.startsWith("0b")) {
        opcode = determineOpcode(instruction);
        instructionType = determineType(instruction, opcode);
    } else if (instruction.startsWith("0x")) {
        result = convertToBinary(instruction);
        opcode = determineOpcode(instruction);
        instructionType = determineType(instruction, opcode);
        result = instructionType;
    } else {
        result = "Invalid input, try entering another number";
    }

    return result;
}

export default convert