from io import TextIOWrapper
import Classes as C
import pygame
import json


main_size = main_width, main_height = 1200,800
main_surface = pygame.display.set_mode(main_size)

file_name = fr"fest_data.json"
try:
    file = open(file_name, "r")
    hangers = json.load(file)
    file.close()
except:
    pass


drawn_hangers = []


range1=6
range2=50
for i1 in range(range1):
    for i2 in range(range2):
        drawn_hangers.append(C.Hanger((main_width*i1/range1+75, main_height*i2/range2+7.5)))

def redraw_window(surface : pygame.Surface) -> None:
    surface.fill((0,0,0))
    for hanger in drawn_hangers:
        hanger.draw(surface)
    pygame.display.flip()


def update_hangers(hangers : dict) -> dict:
    try:
        file = open(file_name,"r")
        hangers = json.load(file)
        file.close()
    except:
        pass
    for index, value in enumerate(hangers.values()):
        if drawn_hangers[index].status != value:
            drawn_hangers[index].update()
    return hangers



def main(surface : pygame.Surface) -> None:
    global hangers
    running = True
    
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYUP:
                if event.key == pygame.K_ESCAPE:
                    running = False
        hangers = update_hangers(hangers)
        redraw_window(surface)


main(main_surface)