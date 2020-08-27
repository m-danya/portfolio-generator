from PIL import Image
from os import listdir
from os.path import isfile, join

path1 = '/home/greedisgood/github/js/ddvb/public/Images/'
path2 = '/home/greedisgood/github/js/ddvb/public/Previews/'

files = [f for f in listdir(path1) if isfile(join(path1, f))]

for image in files:
    im = Image.open('%s%s' % (path1, image))
    im.thumbnail((1000, 563)) # 16:9
    im.save('%s%s' % (path2, image))

