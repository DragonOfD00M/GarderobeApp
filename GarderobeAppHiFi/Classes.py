import pygame
class Mode_box:
    def __init__(self, center_point: tuple[int,int], mode: str) -> None:
        self.center = center_point
        self.font = pygame.font.Font(None, 75)
        self.rect = pygame.Rect(center_point[0]-150,center_point[1]-75,300,150)
        self.mode = mode
        self.colour_chosen = (100,100,100)
        self.colour_normal = (200,200,200)
        
        match self.mode:
            case "C":
                self.text = "Check"
            case "T":
                self.text = "Tag"
            case "P":
                self.text = "Placer"

    
    def draw(self, surface: pygame.Surface, mode: str) -> None:
        if self.is_chosen(mode):
            pygame.draw.rect(surface,self.colour_chosen,self.rect)
        else:
            pygame.draw.rect(surface,self.colour_normal,self.rect)
        pygame.draw.rect(surface,(0,0,0),pygame.Rect(self.center[0]-140,self.center[1]-65,280,130),3)
        
        pygame.draw.line(surface,(0,0,0),(self.center[0]-150,self.center[1]-75),(self.center[0]-140,self.center[1]-65),3)
        pygame.draw.line(surface,(0,0,0),(self.center[0]+150,self.center[1]-75),(self.center[0]+140,self.center[1]-65),3)
        pygame.draw.line(surface,(0,0,0),(self.center[0]-150,self.center[1]+75),(self.center[0]-140,self.center[1]+65),3)
        pygame.draw.line(surface,(0,0,0),(self.center[0]+150,self.center[1]+75),(self.center[0]+140,self.center[1]+65),3)

        
        
        
        box_text = self.font.render(self.text,True,((0,0,0)))
        box_text_rect = box_text.get_rect()
        box_text_rect.center=(self.center)
        surface.blit(box_text,box_text_rect)
    
    def is_chosen(self, mode: str) -> bool:
        if mode == self.mode:
            return True
        else:
            return False

class Input_bar:
    def __init__(self) -> None:
        self.text = ""
        self.font = pygame.font.Font(None, 75)

    def draw(self, surface: pygame.Surface, center: tuple[int, int]) -> None:
        pygame.draw.rect(surface,(150,150,150),pygame.Rect(center[0]-500,center[1]-50,1000,100))
        pygame.draw.rect(surface,(0,0,0),pygame.Rect(center[0]-500,center[1]-50,1000,100),5)
        
        text = self.font.render(self.text, True, (0,0,0))
        text_rect = text.get_rect()
        text_rect.center = center
        surface.blit(text,text_rect)
        pass

    def add(self, char: str) -> None:
        if len(self.text) < 3:
            self.text += char

    def remove(self) -> None:
        if len(self.text) > 0: 
            temp_list = list(self.text)
            temp_list.pop(len(temp_list)-1)
            self.text = "".join(temp_list)

    def clear(self) -> None:
        self.text = ""

    def get_input(self) -> str:
        return self.text
    
class Screen:
    def __init__(self, center: tuple[int, int]) -> None:
        self.text = ""
        self.center = center
        self.font = pygame.font.Font(None, 75)
        self.rect = pygame.Rect(center[0]-500,center[1]-100,1000,200)


    def draw(self, surface: pygame.Surface) -> None:
        pygame.draw.rect(surface,(200,200,200),self.rect)
        pygame.draw.rect(surface,(0,0,0),self.rect,5)
        text = self.font.render(self.text,True,(0,0,0))
        text_rect = text.get_rect()
        text_rect.center = (self.center)
        surface.blit(text,text_rect)

    def update_text(self, input: str) -> None:
        self.text = input
        
class Hanger:
    def __init__(self, center : tuple[int,int]) -> None:
        self.status = True
        self.center = center
        self.rect = pygame.Rect(center[0]-50,center[1]-5,100,10)

    def draw(self, surface : pygame.Surface) -> None:
        if not self.status:
            colour = (0,255,0)
        else:
            colour = (255,0,0)

        pygame.draw.rect(surface,colour,self.rect)

    def update(self) -> None:
        if self.status:
            self.status = False
        else:
            self.status = True




     

