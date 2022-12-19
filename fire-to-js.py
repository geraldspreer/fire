import array
import png
import time

def convert():
    original = png.Reader(file=open('fire.png'))

    try:
        original.asRGB()
    except:
        "Image needs an alpha channel"

    data  = original.read_flat()[2]

    c = 0
    s = '[\n"rgba('
    for i in data:
        s += str(i)
        c += 1
        if c % 4 == 0:
            s += ')",'
            print s
            s = '"rgba('
        else:
            s += ', '
    print ']\n'

if __name__=="__main__":
    convert()
