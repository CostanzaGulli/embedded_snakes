


def twos_complement_conversion(self, msb, lsb):
        """twos_complement_conversion, function to change the 10 bit value
        split across 2 bytes from 2s complement to normal binary/decimal. Also
        the left justification of the 10 bits is removed.

        msb = most significant byte
        lsb = least significant byte"""

        signBit= (msb & 0b10000000)>>7
        msb = msb & 0x7F  # strip off sign bit
        #print('signBit',signBit)

        if signBit == 1:  # negative number        
            x = (msb<<8) + lsb
            x = x^0x7FFF
            x = -(x + 1)
        else: # positive number        
            x = (msb<<8) + lsb

        x = x>>6  # remove left justification of data    

        return x

def single_access_read(self, reg=0x00):
        """single_access_read, function to read a single data register
        of the LIS3DH"""

        rwBit = 0b1  # read/write bit set to read
        msBit = 0b1  # multiple read/write address increment select bit set to auto increment
        dataTransfer=self.bus.read_byte_data(i2cAddress,reg)
        return dataTransfer