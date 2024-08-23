import { ChestDialog } from "@/components/dialogs/ChestDialog";
import { GameMenu } from "@/components/ui/GameMenu";

export class UI {
    menu = new GameMenu();
  
    dialogs = {
      list: {
        chest: ChestDialog,
      }
    }
  }