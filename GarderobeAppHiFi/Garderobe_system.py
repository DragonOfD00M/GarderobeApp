import Classes as C

import pygame
import time
import json
import random

pygame.init()
main_size = main_width, main_height = 1422,800 #74% of normal screen size
main_surface = pygame.display.set_mode((main_width,main_height))


bg_colour = ((11,11,111))

# Numberkeys keycodes
numbers = []
for i in range(10):
    numbers.append(pygame.key.key_code(str(i)))

# Hanger range
hanger_min = 200
hanger_max = 500

# Create the dict of hangers
hangers = {}
for i in range(hanger_min,hanger_max):
    hangers[str(i)] = False

# Load the hangers from the json file
file_name = fr"fest_data.json"
try:
    file = open(file_name, "r")
    hangers = json.load(file)
    file.close()
except:
    pass


modes = ["C","T","P"]
mode = "C"
"""
Mode C is the check function
Mode T is the take function
Mode P is the place function
"""

boxes = []
for i, x in enumerate(modes):
    x_coordinate = (main_width/2-350)+350*i
    y_coordinate = main_height-125
    boxes.append(C.Mode_box((x_coordinate,y_coordinate), x))

input_bar = C.Input_bar()
log_display = C.Screen((main_width/2,150))


def redraw_window(surface: pygame.Surface) -> None:
    surface.fill(bg_colour)
    for box in boxes:
        box.draw(surface, mode)
    
    
    input_bar.draw(surface,(main_width/2,main_height/2))
    log_display.draw(surface)
    pygame.display.flip() #Updates main_surface

def main(surface: pygame.Surface) -> None:
    global mode
    global hangers
    running = True
    while running:
        
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYUP:
                
                if event.key == pygame.K_ESCAPE:
                    running = False
                
                if event.key in numbers:
                    input_bar.add(str(event.key-48))

                if event.key == pygame.K_BACKSPACE:
                    input_bar.remove()

                if event.key == pygame.K_LEFT:
                    for index, value in enumerate(modes):
                        if mode == value:
                            i = index
                    if mode == "C":
                        mode = modes[2]
                    else:
                        mode = modes[i-1]

                if event.key == pygame.K_RIGHT:
                    for index, value in enumerate(modes):
                        if mode == value:
                            i = index
                    if mode == "P":
                        mode = modes[0]
                    else:
                        mode = modes[i+1]


                if event.key == pygame.K_RETURN:
                    file = open(file_name,"w")
                    log = open(r"fest_log.log", "a", encoding="utf-8")
                    hanger = input_bar.get_input()
                    match mode:
                        case "C":
                            if hanger == "":
                                hangers_in_use = []
                                for key, value in hangers.items():
                                    if value is True:
                                        hangers_in_use.append(key)
                                if len(hangers_in_use) == 1:
                                    log_display.update_text("".join(hangers_in_use))
                                else:
                                    log_display.update_text(", ".join(hangers_in_use))
                                log.write(f"{time.asctime(time.localtime(time.time()))}: Tjeck på brugte bøjler blev lavet, {len(hangers_in_use)} i brug på nuværende tidspunkt\n")
                            else:
                                match hangers.get(hanger):
                                    case True:
                                        log_display.update_text(f"Bøjle nr. {hanger} er i brug")
                                        log.write(f"{time.asctime(time.localtime(time.time()))}: Bøjle nr. {hanger} blev tjekket. Den er i brug\n")
                                    case False:
                                        log_display.update_text(f"Bøjle nr. {hanger} er ikke i brug")
                                        log.write(f"{time.asctime(time.localtime(time.time()))}: Bøjle nr. {hanger} blev tjekket. Den er ikke i brug\n")

                        case "T":
                            match hangers.get(hanger):
                                case True:
                                    log_display.update_text(f"Bøjlen {hanger} er allerade i brug")
                                    log.write(f"{time.asctime(time.localtime(time.time()))}: Bøjle nr. {hanger} blev accessed, prøvede at blive taget, men var allerede i brug\n")
                                case False:
                                    hangers[hanger] = True
                                    log_display.update_text(f"Bøjlen {hanger} er nu taget i brug")
                                    log.write(f"{time.asctime(time.localtime(time.time()))}: Bøjle nr. {hanger} blev accessed, bøjlen er blevet taget i brug\n")

                        case "P":
                            match hangers.get(hanger):
                                case True:
                                    hangers[hanger] = False
                                    log_display.update_text(f"Bøjlen {hanger} er nu lagt på plads")
                                    log.write(f"{time.asctime(time.localtime(time.time()))}: Bøjle nr. {hanger} blev accessed, bøjlen er ikke længere i brug\n")
                                case False:
                                    log_display.update_text(f"Bøjlen {hanger} er ikke i brug")
                                    log.write(f"{time.asctime(time.localtime(time.time()))}: Bøjle nr. {hanger} blev accessed, prøvede at blive lagt tilbage, men var ikke i brug\n")
                            
                    input_bar.clear()

                    json.dump(hangers,file)
                    file.close()
                    log.close()





        redraw_window(surface)


main(main_surface)
        