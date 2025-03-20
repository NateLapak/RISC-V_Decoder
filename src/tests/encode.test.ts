import {encode} from "../Components/convert"

// Basic encoding test for hexadecimal numbers
test("Encode hexadecimal numbers", () => {

    // Test 1
    expect(encode("addi t0, t0, 1")).toEqual("0x00128293");

})