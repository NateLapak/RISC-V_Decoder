const convert = (instruction: string) => {

    let result:string = "";

    // If instruction was given in hexadecimal, convert to binary
    const convertToBinary = (instruction: string) => {
        return;
    }

    // Determine type of RISC-V instruction.
    const determineOpcode = (instruction:string) => {
        let opcode:number = 0;
        result = "test";
    }

    if (!instruction) return "Invalid input";

    // Example: Simple check if it's binary or hex
    if (instruction.startsWith("0b")) {
        determineOpcode(instruction);
    } else if (instruction.startsWith("0x")) {
        convertToBinary(instruction);
        determineOpcode(instruction);
    } else {
        result = "Invalid input, try entering another number";
    }

    return result;
}

export default convert