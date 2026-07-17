import { format } from "date-fns";
import VisitLogForm from "./visitLogForm";

const VisitCard = ({ card }) => {
    return (
        <div className="flex w-full p-4 rounded-xl border border-green-100 bg-green-50">
            <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center justify-between w-full">
                    <div className="flex w-fit flex-col">
                        <span className="text-base font-semibold text-neutral-800">
                            {card.doctor.name}
                        </span>
                        <span className="text-[10px] font-medium text-neutral-600">
                            {format(new Date(card.visitDate), "PPp")}
                        </span>
                    </div>
                    <VisitLogForm
                        icon
                        initialValues={card}
                        data={card}
                        size="icon-sm"
                        variant="outline"
                    />
                </div>
                <p className="text-xs text-neutral-800 italic">
                    "{card.comments}"
                </p>
            </div>
        </div>
    );
};

export default VisitCard;
