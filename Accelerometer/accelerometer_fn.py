import Accelerometer.constants as constants
import smbus

def read_xyz():
    bus = smbus.SMBus(1)
    I2C_Address= constants.ACCELEROMETER_ADDRESS

    data_rate = 0b0010
    x_enable = 0b1
    y_enable = 0b1
    z_enable = 0b1
    fs = 0b00 #Full-scale selection.(00: ±2 g; 01: ±4 g; 10: ±8 g; 11: ±16 g)
    
    control1 = (data_rate<<4) + (0b0<<3) + (z_enable<<2) + (y_enable<<1) + x_enable
    control2 = (0b00<<6) + (fs<<4) + 0b0000
    bus.write_byte_data(I2C_Address, constants.CTRL_REG1, control1) #write_byte_data(address, offset, data)
    bus.write_byte_data(I2C_Address, constants.CTRL_REG4, control2)

    data_x0 = bus.read_byte_data(I2C_Address, constants.X_LSB) #check address-offset
    data_x1 = bus.read_byte_data(I2C_Address, constants.X_MSB)
    data_y0 = bus.read_byte_data(I2C_Address, constants.Y_LSB)
    data_y1 = bus.read_byte_data(I2C_Address, constants.Y_MSB)
    data_z0 = bus.read_byte_data(I2C_Address, constants.Z_LSB)
    data_z1 = bus.read_byte_data(I2C_Address, constants.Z_MSB)

    #2's compelment conversion
    xAccl = data_x1 * 256 + data_x0
    if xAccl > 32767 :
        xAccl -= 65536
    yAccl = data_y1 * 256 + data_y0
    if yAccl > 32767 :
        yAccl -= 65536
    zAccl = data_z1 * 256 + data_z0
    if zAccl > 32767 :
        zAccl -= 65536
    
    return xAccl, yAccl, zAccl