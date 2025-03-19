import {decode} from "../Components/convert"

// Decode tests
describe("Decode tests", () => {
    it("Translate binary or hex number into RISC-V Assembly", () => {
        expect(decode("0x00128293") === (["addi t0, t0, 1", "I"]));
        expect(decode("0x41de0f33") === (["sub t5, t3, t4", "S"]));
    })
})