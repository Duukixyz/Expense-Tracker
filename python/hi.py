from random import randint
import sys
answer = randint(int(sys.argv[1]), int(sys.argv[2]));

while True:
    try:
        guess = int(input("guess a number 1-10: "));
        if 0 < int(guess) < 11:
            if guess == answer:
                print('all good')
                break
        else:
            print("please enter number between 1-10");
    except ValueError:
        print('please enter a number')
        continue