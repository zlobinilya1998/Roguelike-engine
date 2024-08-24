import { ExperienceBar } from "@/components/Hud/Player/ExperienceBar"
import { HealthBar } from "@/components/Hud/Player/HealthBar"
import { Skills } from "@/components/Hud/Player/Skills"

export class HUD {
    list = [new HealthBar(), new ExperienceBar(), new Skills()]
    // inventory = new PlayerInventory();
  
    get entities() {
      return this.list
    }
  
  }