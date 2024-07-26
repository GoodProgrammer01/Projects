import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black_king.png"
import whiteLogo from "../../assets/white_king.png"

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo; 
        this.name = FigureNames.KING;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;

        const dX = Math.abs(target.x - this.cell.x);
        const dY = Math.abs(target.y - this.cell.y);

        if (dX <= 1 && dY <= 1) {
            if (target.figure?.color !== this.color) {
                return true;
            }
        }

        return false;
    }

    moveFigure(target: Cell) {
        super.moveFigure(target);     
    }
}