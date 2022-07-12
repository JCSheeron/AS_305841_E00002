define(["require", "exports", "./calculators/addCalculator", "./calculators/subCalculator", "./calculators/mulCalculator", "./calculators/divCalculator", "./calculators/diffCalculator", "./calculators/lpBesselCalculator", "./calculators/xyCalculator", "./calculators/expCalculator", "./calculators/absCalculator", "./calculators/limitCalculator", "./calculators/sqrtCalculator", "./calculators/vectCalculator", "./calculators/maxCalculator", "./calculators/minCalculator", "./calculators/fftCalculator", "./calculators/sinCalculator", "./calculators/cosCalculator", "./calculators/atan2Calculator", "./calculators/shiftTimeAxisCalculator", "./calculators/timeStampSyncCalculator", "./calculators/andCalculator", "./calculators/orCalculator", "./calculators/notCalculator", "./calculators/stringMathjsCalculator", "./calculators/lessThanCalculator", "./calculators/greaterThanCalculator", "./calculators/equalToCalculator", "./calculators/moduloCalculator"], function (require, exports, addCalculator_1, subCalculator_1, mulCalculator_1, divCalculator_1, diffCalculator_1, lpBesselCalculator_1, xyCalculator_1, expCalculator_1, absCalculator_1, limitCalculator_1, sqrtCalculator_1, vectCalculator_1, maxCalculator_1, minCalculator_1, fftCalculator_1, sinCalculator_1, cosCalculator_1, atan2Calculator_1, shiftTimeAxisCalculator_1, timeStampSyncCalculator_1, andCalculator_1, orCalculator_1, notCalculator_1, stringMathjsCalculator_1, lessThanCalculator_1, greaterThanCalculator_1, equalToCalculator_1, moduloCalculator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CalculatorProvider = /** @class */ (function () {
        function CalculatorProvider() {
            this.calculators = new Array();
            this.calculators.push(new addCalculator_1.AddCalculator());
            this.calculators.push(new subCalculator_1.SubCalculator());
            this.calculators.push(new mulCalculator_1.MulCalculator());
            this.calculators.push(new divCalculator_1.DivCalculator());
            this.calculators.push(new diffCalculator_1.DiffCalculator());
            this.calculators.push(new expCalculator_1.ExpCalculator());
            this.calculators.push(new sqrtCalculator_1.SqrtCalculator());
            this.calculators.push(new vectCalculator_1.VectCalculator());
            this.calculators.push(new absCalculator_1.AbsCalculator());
            this.calculators.push(new maxCalculator_1.MaxCalculator());
            this.calculators.push(new minCalculator_1.MinCalculator());
            this.calculators.push(new limitCalculator_1.LimitCalculator);
            //this.calculators.push(new LpButterworthCalculator());
            this.calculators.push(new lpBesselCalculator_1.LpBesselCalculator());
            this.calculators.push(new sinCalculator_1.SinCalculator());
            this.calculators.push(new cosCalculator_1.CosCalculator());
            this.calculators.push(new atan2Calculator_1.Atan2Calculator());
            this.calculators.push(new shiftTimeAxisCalculator_1.ShiftTimeAxisCalculator());
            this.calculators.push(new timeStampSyncCalculator_1.TimeStampSyncCalculator());
            this.calculators.push(new andCalculator_1.AndCalculator());
            this.calculators.push(new orCalculator_1.OrCalculator());
            this.calculators.push(new notCalculator_1.NotCalculator());
            this.calculators.push(new stringMathjsCalculator_1.StringMathjsCalculator());
            this.calculators.push(new xyCalculator_1.XYCalculator());
            this.calculators.push(new fftCalculator_1.FftCalculator());
            this.calculators.push(new lessThanCalculator_1.LessThanCalculator());
            this.calculators.push(new greaterThanCalculator_1.GreaterThanCalculator());
            this.calculators.push(new equalToCalculator_1.EqualToCalculator());
            this.calculators.push(new moduloCalculator_1.ModuloCalculator());
        }
        /**
         * gets a singleton instance of UiCalculatorProvider
         *
         * @readonly
         * @type {UiCalculatorProvider}
         * @memberof UiCalculatorProvider
         */
        CalculatorProvider.getInstance = function () {
            this._instance = this._instance ? this._instance : new CalculatorProvider();
            return this._instance;
        };
        /**
         * Returns a calculator instance for the given id
         *
         * @param {string} id
         * @returns {(IUiCalculator|undefined)}
         * @memberof UiCalculatorProvider
         */
        CalculatorProvider.prototype.getCalculator = function (id) {
            var result = this.calculators.filter(function (element) {
                return element.id == id;
            });
            if (result.length > 0) {
                return result[0];
            }
            return undefined; // TODO: Return Dummy
        };
        /**
         * Returns the id for the given displayname
         *
         * @param {string} displayName
         * @returns {string}
         * @memberof CalculatorProvider
         */
        CalculatorProvider.prototype.convertDisplayNameToId = function (displayName) {
            var result = this.calculators.filter(function (element) {
                return element.displayName == displayName;
            });
            if (result.length > 0) {
                return result[0].id;
            }
            return "";
        };
        /**
         * Returns the displayname for the given id
         *
         * @param {string} id
         * @returns {string}
         * @memberof CalculatorProvider
         */
        CalculatorProvider.prototype.convertIdToDisplayName = function (id) {
            var calculator = this.getCalculator(id);
            if (calculator != undefined) {
                return calculator.displayName;
            }
            return "";
        };
        return CalculatorProvider;
    }());
    exports.CalculatorProvider = CalculatorProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRvclByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvY29tbW9uL2NhbGN1bGF0b3JQcm92aWRlci9jYWxjdWxhdG9yUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBK0JBO1FBR0k7WUFGTyxnQkFBVyxHQUFHLElBQUksS0FBSyxFQUFlLENBQUM7WUFHMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSw2QkFBYSxFQUFFLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLDZCQUFhLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksNkJBQWEsRUFBRSxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSw2QkFBYSxFQUFFLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLCtCQUFjLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksNkJBQWEsRUFBRSxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSwrQkFBYyxFQUFFLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLCtCQUFjLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksNkJBQWEsRUFBRSxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSw2QkFBYSxFQUFFLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLDZCQUFhLEVBQUUs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QUFDLENBQUMsRUFBRSxDQUFDO2FBQ3ZCO1lBQ0QsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsbURBQXNCLEdBQXRCLFVBQXVCLEVBQVU7WUFDOUIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4QyxJQUFHLFVBQVUsSUFBSSxTQUFTLEVBQUM7Z0JBQ3ZCLE9BQU8sVUFBVSxDQUFDLFdBQVcsQ0FBQzthQUNqQztZQUNELE9BQU8sRUFBRSxDQUFDO1FBQ2IsQ0FBQztRQUNMLHlCQUFDO0lBQUQsQ0FBQyxBQWxHRCxJQWtHQztJQWxHWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZGRDYWxjdWxhdG9yIH0gZnJvbSBcIi4vY2FsY3VsYXRvcnMvYWRkQ2FsY3VsYXRvclwiO1xyXG5pbXBvcnQgeyBTdWJDYWxjdWxhdG9yIH0gZnJvbSBcIi4vY2FsY3VsYXRvcnMvc3ViQ2FsY3VsYXRvclwiO1xyXG5pbXBvcnQgeyBNdWxDYWxjdWxhdG9yIH0gZnJvbSBcIi4vY2FsY3VsYXRvcnMvbXVsQ2FsY3VsYXRvclwiO1xyXG5pbXBvcnQgeyBEaXZDYWxjdWxhdG9yIH0gZnJvbSBcIi4vY2FsY3VsYXRvcnMvZGl2Q2FsY3VsYXRvclwiO1xyXG5pbXBvcnQgeyBEaWZmQ2FsY3VsYXRvciB9IGZyb20gXCIuL2NhbGN1bGF0b3JzL2RpZmZDYWxjdWxhdG9yXCI7XHJcbi8vaW1wb3J0IHsgTHBCdXR0ZXJ3b3J0aENhbGN1bGF0b3IgfSBmcm9tIFwiLi9jYWxjdWxhdG9ycy9scEJ1dHRlcndvcnRoQ2FsY3VsYXRvclwiO1xyXG5pbXBvcnQgeyBMcEJlc3NlbENhbGN1bGF0b3IgfSBmcm9tIFwiLi9jYWxjdWxhdG9ycy9scEJlc3NlbENhbGN1bGF0b3JcIjtcclxuaW1wb3J0IHsgSUNhbGN1bGF0b3IgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2NhbGN1bGF0b3JJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgWFlDYWxjdWxhdG9yIH0gZnJvbSBcIi4vY2FsY3VsYXRvcnMveHlDYWxjdWxhdG9yXCI7XHJcbmltcG9ydCB7IEV4cENhbGN1bGF0b3IgfSBmcm9tIFwiLi9jYWxjdWxhdG9ycy9leHBDYWxjdWxhdG9yXCI7XHJcbmltcG9ydCB7IEFic0NhbGN1bGF0b3IgfSBmcm9tIFwiLi9jYWxjdWxhdG9ycy9hYnNDYWxjdWxhdG9yXCI7XHJcbmltcG9ydCB7IExpbWl0Q2FsY3VsYXRvciB9IGZyb20gXCIuL2NhbGN1bGF0b3JzL2xpbWl0Q2FsY3VsYXRvclwiO1xyXG5pbXBvcnQgeyBTcXJ0Q2FsY3VsYXRvciB9IGZyb20gXCIuL2NhbGN1bGF0b3JzL3NxcnRDYWxjdWxhdG9yXCI7XHJcbmltcG9ydCB7IFZlY3RDYWxjdWxhdG9yIH0gZnJvbSBcIi4vY2FsY3VsYXRvcnMvdmVjdENhbGN1bGF0b3JcIjtcclxuaW1wb3J0IHsgTWF4Q2FsY3VsYXRvciB9IGZyb20gXCIuL2NhbGN1bGF0b3JzL21heENhbGN1bGF0b3JcIjtcclxuaW1wb3J0IHsgTWluQ2FsY3VsYXRvciB9IGZyb20gXCIuL2NhbGN1bGF0b3JzL21pbkNhbGN1bGF0b3JcIjtcclxuaW1wb3J0IHsgRmZ0Q2FsY3VsYXRvciB9IGZyb20gXCIuL2NhbGN1bGF0b3JzL2ZmdENhbGN1bGF0b3JcIjtcclxuaW1wb3J0IHsgU2luQ2FsY3VsYXRvciB9IGZyb20gXCIuL2NhbGN1bGF0b3JzL3NpbkNhbGN1bGF0b3JcIjtcclxuaW1wb3J0IHsgQ29zQ2FsY3VsYXRvciB9IGZyb20gXCIuL2NhbGN1bGF0b3JzL2Nvc0NhbGN1bGF0b3JcIjtcclxuaW1wb3J0IHsgQXRhbjJDYWxjdWxhdG9yIH0gZnJvbSBcIi4vY2FsY3VsYXRvcnMvYXRhbjJDYWxjdWxhdG9yXCI7XHJcbmltcG9ydCB7IFNoaWZ0VGltZUF4aXNDYWxjdWxhdG9yIH0gZnJvbSBcIi4vY2FsY3VsYXRvcnMvc2hpZnRUaW1lQXhpc0NhbGN1bGF0b3JcIjtcclxuaW1wb3J0IHsgVGltZVN0YW1wU3luY0NhbGN1bGF0b3IgfSBmcm9tIFwiLi9jYWxjdWxhdG9ycy90aW1lU3RhbXBTeW5jQ2FsY3VsYXRvclwiO1xyXG5pbXBvcnQgeyBBbmRDYWxjdWxhdG9yIH0gZnJvbSBcIi4vY2FsY3VsYXRvcnMvYW5kQ2FsY3VsYXRvclwiO1xyXG5pbXBvcnQgeyBPckNhbGN1bGF0b3IgfSBmcm9tIFwiLi9jYWxjdWxhdG9ycy9vckNhbGN1bGF0b3JcIjtcclxuaW1wb3J0IHsgTm90Q2FsY3VsYXRvciB9IGZyb20gXCIuL2NhbGN1bGF0b3JzL25vdENhbGN1bGF0b3JcIjtcclxuaW1wb3J0IHsgU3RyaW5nTWF0aGpzQ2FsY3VsYXRvciB9IGZyb20gXCIuL2NhbGN1bGF0b3JzL3N0cmluZ01hdGhqc0NhbGN1bGF0b3JcIjtcclxuaW1wb3J0IHsgTGVzc1RoYW5DYWxjdWxhdG9yIH0gZnJvbSBcIi4vY2FsY3VsYXRvcnMvbGVzc1RoYW5DYWxjdWxhdG9yXCI7XHJcbmltcG9ydCB7IEdyZWF0ZXJUaGFuQ2FsY3VsYXRvciB9IGZyb20gXCIuL2NhbGN1bGF0b3JzL2dyZWF0ZXJUaGFuQ2FsY3VsYXRvclwiO1xyXG5pbXBvcnQgeyBFcXVhbFRvQ2FsY3VsYXRvciB9IGZyb20gXCIuL2NhbGN1bGF0b3JzL2VxdWFsVG9DYWxjdWxhdG9yXCI7XHJcbmltcG9ydCB7IE1vZHVsb0NhbGN1bGF0b3IgfSBmcm9tIFwiLi9jYWxjdWxhdG9ycy9tb2R1bG9DYWxjdWxhdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FsY3VsYXRvclByb3ZpZGVye1xyXG4gICAgcHVibGljIGNhbGN1bGF0b3JzID0gbmV3IEFycmF5PElDYWxjdWxhdG9yPigpO1xyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JzLnB1c2gobmV3IEFkZENhbGN1bGF0b3IoKSk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9ycy5wdXNoKG5ldyBTdWJDYWxjdWxhdG9yKCkpO1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRvcnMucHVzaChuZXcgTXVsQ2FsY3VsYXRvcigpKTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JzLnB1c2gobmV3IERpdkNhbGN1bGF0b3IoKSk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9ycy5wdXNoKG5ldyBEaWZmQ2FsY3VsYXRvcigpKTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JzLnB1c2gobmV3IEV4cENhbGN1bGF0b3IoKSk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9ycy5wdXNoKG5ldyBTcXJ0Q2FsY3VsYXRvcigpKTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JzLnB1c2gobmV3IFZlY3RDYWxjdWxhdG9yKCkpO1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRvcnMucHVzaChuZXcgQWJzQ2FsY3VsYXRvcigpKTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JzLnB1c2gobmV3IE1heENhbGN1bGF0b3IoKSk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9ycy5wdXNoKG5ldyBNaW5DYWxjdWxhdG9yKCkpO1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRvcnMucHVzaChuZXcgTGltaXRDYWxjdWxhdG9yKTtcclxuICAgICAgICAvL3RoaXMuY2FsY3VsYXRvcnMucHVzaChuZXcgTHBCdXR0ZXJ3b3J0aENhbGN1bGF0b3IoKSk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9ycy5wdXNoKG5ldyBMcEJlc3NlbENhbGN1bGF0b3IoKSk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9ycy5wdXNoKG5ldyBTaW5DYWxjdWxhdG9yKCkpO1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRvcnMucHVzaChuZXcgQ29zQ2FsY3VsYXRvcigpKTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JzLnB1c2gobmV3IEF0YW4yQ2FsY3VsYXRvcigpKTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JzLnB1c2gobmV3IFNoaWZ0VGltZUF4aXNDYWxjdWxhdG9yKCkpXHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9ycy5wdXNoKG5ldyBUaW1lU3RhbXBTeW5jQ2FsY3VsYXRvcigpKTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JzLnB1c2gobmV3IEFuZENhbGN1bGF0b3IoKSk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9ycy5wdXNoKG5ldyBPckNhbGN1bGF0b3IoKSk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9ycy5wdXNoKG5ldyBOb3RDYWxjdWxhdG9yKCkpO1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRvcnMucHVzaChuZXcgU3RyaW5nTWF0aGpzQ2FsY3VsYXRvcigpKTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JzLnB1c2gobmV3IFhZQ2FsY3VsYXRvcigpKTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JzLnB1c2gobmV3IEZmdENhbGN1bGF0b3IoKSk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9ycy5wdXNoKG5ldyBMZXNzVGhhbkNhbGN1bGF0b3IoKSk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9ycy5wdXNoKG5ldyBHcmVhdGVyVGhhbkNhbGN1bGF0b3IoKSk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdG9ycy5wdXNoKG5ldyBFcXVhbFRvQ2FsY3VsYXRvcigpKTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0b3JzLnB1c2gobmV3IE1vZHVsb0NhbGN1bGF0b3IoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaG9sZHMgYW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzc1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBDYWxjdWxhdG9yUHJvdmlkZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRzIGEgc2luZ2xldG9uIGluc3RhbmNlIG9mIFVpQ2FsY3VsYXRvclByb3ZpZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7VWlDYWxjdWxhdG9yUHJvdmlkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgVWlDYWxjdWxhdG9yUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBDYWxjdWxhdG9yUHJvdmlkZXIge1xyXG4gICAgICAgIHRoaXMuX2luc3RhbmNlID0gdGhpcy5faW5zdGFuY2UgPyB0aGlzLl9pbnN0YW5jZSA6IG5ldyBDYWxjdWxhdG9yUHJvdmlkZXIoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgY2FsY3VsYXRvciBpbnN0YW5jZSBmb3IgdGhlIGdpdmVuIGlkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcmV0dXJucyB7KElVaUNhbGN1bGF0b3J8dW5kZWZpbmVkKX1cclxuICAgICAqIEBtZW1iZXJvZiBVaUNhbGN1bGF0b3JQcm92aWRlclxyXG4gICAgICovXHJcbiAgICBnZXRDYWxjdWxhdG9yKGlkOiBzdHJpbmcpOiBJQ2FsY3VsYXRvcnx1bmRlZmluZWR7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY2FsY3VsYXRvcnMuZmlsdGVyKGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuaWQgPT0gaWQ7IFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgaWYocmVzdWx0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0WzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkOyAvLyBUT0RPOiBSZXR1cm4gRHVtbXlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGlkIGZvciB0aGUgZ2l2ZW4gZGlzcGxheW5hbWVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGlzcGxheU5hbWVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRvclByb3ZpZGVyXHJcbiAgICAgKi9cclxuICAgIGNvbnZlcnREaXNwbGF5TmFtZVRvSWQoZGlzcGxheU5hbWU6IHN0cmluZyk6IHN0cmluZ3tcclxuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jYWxjdWxhdG9ycy5maWx0ZXIoZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5kaXNwbGF5TmFtZSA9PSBkaXNwbGF5TmFtZTsgXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICBpZihyZXN1bHQubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRbMF0uaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGlzcGxheW5hbWUgZm9yIHRoZSBnaXZlbiBpZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqIEBtZW1iZXJvZiBDYWxjdWxhdG9yUHJvdmlkZXJcclxuICAgICAqL1xyXG4gICAgY29udmVydElkVG9EaXNwbGF5TmFtZShpZDogc3RyaW5nKTogc3RyaW5ne1xyXG4gICAgICAgbGV0IGNhbGN1bGF0b3IgPSB0aGlzLmdldENhbGN1bGF0b3IoaWQpO1xyXG4gICAgICAgaWYoY2FsY3VsYXRvciAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgIHJldHVybiBjYWxjdWxhdG9yLmRpc3BsYXlOYW1lO1xyXG4gICAgICAgfVxyXG4gICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn0iXX0=