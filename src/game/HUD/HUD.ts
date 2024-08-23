import { ExperienceBar } from "@/components/Hud/Player/ExperienceBar"
import { HealthBar } from "@/components/Hud/Player/HealthBar"

export class HUD {
    list = [new HealthBar(), new ExperienceBar()]
    // inventory = new PlayerInventory();
  
    get entities() {
      return this.list
    }
  
  }