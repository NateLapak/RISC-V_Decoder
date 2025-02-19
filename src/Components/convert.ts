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

        let type:string = "";

        // Determine type using opcode
        switch (opcode) {
            case "00110011":
                alert("R-type");
                type = "0110011";
                break;

            case "0010011":
                alert("I-type arithmetic");
                type = "0010011";
                break;

            case "0000011":
                alert("I-type Load")
                type = "0000011";
                break;

            case "1100111":
                alert("I-type jump");
                type = "1100111";
                break;

            case "0100011":
                alert("S-type store");
                type = "0100011";
                break;

            case "1100011":
                alert("SB-type (branch instruction)");
                type = "1100011";
                break;

            case "0110111":
                alert("U-type (Load Upper Immediate)");
                type = "0110111";
                break;

            case "0010111":
                alert("U-type (AUIPC)");
                type = "0010111";
                break;

            case "1101111":
                alert("J-type instruct (JAL)");
                type = "1101111";
                break;

            default:
                alert("Error");
                type = "";
                break;

        }

        return type;
        
    }

    // Input is in binary, 
    if (instruction.startsWith("0b")) {
        opcode = determineOpcode(instruction);
        instructionType = determineType(instruction, opcode);
    } else if (instruction.startsWith("0x")) {
        result = convertToBinary(instruction);
        opcode = determineOpcode(instruction);
        instructionType = determineType(instruction, opcode);
    } else {
        result = "Invalid input, try entering another number";
    }

    return result;
}

export default convert