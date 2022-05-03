ACTION CalcSpecialPositions :
  // If there is an algorithm needed for calculating a different position, it can be done here
  // If not, just use the axis position.
  ax.Status.CalculatedPosition1 :=  ax.Status.Position;
  ax.Status.CalculatedPosition2 :=  ax.Status.Position;
  ax.Status.CalculatedPosition3 :=  ax.Status.Position;
END_ACTION

