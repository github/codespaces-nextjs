import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { UtensilsCrossed, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import styles from '../styles/home.module.css';

function Home() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isManaging, setIsManaging] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [newUtensil, setNewUtensil] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch ingredients and equipment data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch ingredients
        const ingredientsResponse = await fetch("/api/user/ingredients");
        if (ingredientsResponse.ok) {
          const ingredientsData = await ingredientsResponse.json();
          setIngredients(ingredientsData);
        }

        // Fetch equipment
        const equipmentResponse = await fetch("/api/user/cooking-equipment");
        if (equipmentResponse.ok) {
          const equipmentData = await equipmentResponse.json();
          setEquipment(equipmentData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Add ingredient
  const addIngredient = async (name) => {
    try {
      const res = await fetch("/api/user/ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category: "General" }),
      });
      
      if (res.ok) {
        const newIngredient = await res.json();
        setIngredients([...ingredients, newIngredient]);
        setNewItem("");
        toast({
          title: "Ingredient Added",
          description: "Your ingredient has been added successfully.",
        });
      }
    } catch (error) {
      console.error("Error adding ingredient:", error);
    }
  };

  // Remove ingredient
  const removeIngredient = async (id) => {
    try {
      const res = await fetch(`/api/user/ingredients/${id}`, { 
        method: "DELETE" 
      });
      
      if (res.ok) {
        setIngredients(ingredients.filter(item => item.id !== id));
        toast({
          title: "Ingredient Removed",
          description: "Your ingredient has been removed successfully.",
        });
      }
    } catch (error) {
      console.error("Error removing ingredient:", error);
    }
  };

  // Update equipment
  const updateEquipment = async (newEquipmentList) => {
    try {
      const res = await fetch("/api/user/cooking-equipment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cookingEquipment: newEquipmentList }),
      });
      
      if (res.ok) {
        setEquipment(newEquipmentList);
        setNewUtensil("");
        toast({
          title: "Equipment Updated",
          description: "Your kitchen equipment has been updated successfully.",
        });
      }
    } catch (error) {
      console.error("Error updating equipment:", error);
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      addIngredient(newItem.trim());
    }
  };

  const handleAddUtensil = (e) => {
    e.preventDefault();
    if (newUtensil.trim()) {
      updateEquipment([...(equipment || []), newUtensil.trim()]);
    }
  };

  const handleRemoveUtensil = (item) => {
    const newEquipment = equipment?.filter(i => i !== item) || [];
    updateEquipment(newEquipment);
  };

  return (
    <div className="container mx-auto px-4 py-4 md:py-8 min-h-[100dvh]">
      {/* Welcome Card */}
      <Card className="mb-6 md:mb-8">
        <CardContent className="pt-6 px-4 md:px-6">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold leading-tight">
              Welcome to Humber Bites – Your AI-Powered Smart Kitchen Assistant!
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Say goodbye to mealtime stress and hello to effortless cooking! Humber Bites helps you plan meals, 
              create grocery lists, and cook with AI-powered recommendations tailored to your taste, diet, 
              and kitchen essentials.
            </p>
            <Button 
              size="lg" 
              className="w-full md:w-auto min-h-[48px] text-base"
              onClick={() => setIsManaging(true)}
            >
              <Plus className="h-5 w-5 mr-2" />
              Manage My Kitchen
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Kitchen Management Dialog */}
      <Dialog open={isManaging} onOpenChange={setIsManaging}>
        <DialogContent className="w-[95vw] max-w-4xl p-0 h-[95vh] md:h-auto">
          <ScrollArea className="h-full max-h-[95vh] md:max-h-[85vh]">
            <div className="p-4 md:p-6">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-xl md:text-2xl">Manage My Kitchen</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Ingredients Management Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Manage Ingredients</h3>
                  <form onSubmit={handleAddItem} className="space-y-4">
                    <div>
                      <Label htmlFor="newItem" className="text-base mb-2">Add New Ingredient</Label>
                      <div className="flex gap-2">
                        <Input
                          id="newItem"
                          placeholder="Enter ingredient name..."
                          value={newItem}
                          onChange={(e) => setNewItem(e.target.value)}
                          className="min-h-[48px] text-base"
                        />
                        <Button
                          type="submit"
                          className="min-h-[48px] px-6"
                        >
                          <Plus className="h-5 w-5 mr-2" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </form>
                  <div className="space-y-2">
                    {isLoading ? (
                      <p>Loading ingredients...</p>
                    ) : (
                      ingredients.map((ingredient) => (
                        <div
                          key={ingredient.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-accent/50"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{ingredient.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {ingredient.category}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeIngredient(ingredient.id)}
                            className="h-9 w-9"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Equipment Management Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Manage Equipment</h3>
                  <form onSubmit={handleAddUtensil} className="space-y-4">
                    <div>
                      <Label htmlFor="newUtensil" className="text-base mb-2">Add New Equipment</Label>
                      <div className="flex gap-2">
                        <Input
                          id="newUtensil"
                          placeholder="Enter equipment name..."
                          value={newUtensil}
                          onChange={(e) => setNewUtensil(e.target.value)}
                          className="min-h-[48px] text-base"
                        />
                        <Button
                          type="submit"
                          className="min-h-[48px] px-6"
                        >
                          <Plus className="h-5 w-5 mr-2" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </form>
                  <div className="space-y-2">
                    {isLoading ? (
                      <p>Loading equipment...</p>
                    ) : (
                      equipment.map((item) => (
                        <div
                          key={item}
                          className="flex items-center justify-between p-3 rounded-lg bg-accent/50"
                        >
                          <span className="text-sm">{item}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveUtensil(item)}
                            className="h-9 w-9"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Dialog Footer */}
              <div className="mt-8 pt-8 border-t">
                <div className="text-center space-y-4">
                  <p className="text-base text-muted-foreground">
                    Ready to start planning your meals?
                  </p>
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto min-h-[48px] text-base px-8"
                    onClick={() => {
                      setIsManaging(false);
                      setLocation("/cook-meal");
                    }}
                  >
                    <UtensilsCrossed className="h-5 w-5 mr-2" />
                    Start Meal Planning
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Home;
