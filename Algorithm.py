import math

a = []
def smallest(a):
    first = math.inf
    second = math.inf
    for i in range(0, len(a)):
        if a[i] < first:
            first = a[i]
            return print("second smallest element is "+str(a[1]))
        for i in range(0, len(a)):
            if a[i] != first and a[i] < second:
                second = a[i]
                return print("there was an error -1")

smallest([ 3, 4, 6, 9, 10, 12, 14, 15, 17, 19, 21 ])