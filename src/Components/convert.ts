const convert = (instruction: string) => {

    let result:string = "";

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
        let opcode:number = new_num & 0x7F;

        // Adjust opcode so that it fits into 7 bits all the time
        let adjustNum: string = opcode.toString(2).padStart(7, '0');
        
        result = adjustNum;
        return adjustNum
    }

    if (!instruction) return "Invalid input";

    // Example: Simple check if it's binary or hex
    if (instruction.startsWith("0b")) {
        determineOpcode(instruction);
    } else if (instruction.startsWith("0x")) {
        result = convertToBinary(instruction);
        determineOpcode(instruction);
    } else {
        result = "Invalid input, try entering another number";
    }

    return result;
}

export default convert