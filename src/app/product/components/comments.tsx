import TypographyH3 from "@/components/typography/typography-h3";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import icon from "@/components/icons/icon-component";
import TypographyH4 from "@/components/typography/typography-h4";

const commentContent = [
  {
    name: ["Sarah Johnson", "John Doe", "Jane Doe", "Maria Silva"],
    date: "2 dias atrás",
    rating: 5,
    background: [
      "bg-red-500",
      "bg-stone-600",
      "bg-purple-500",
      "bg-purple-900",
    ],
    text: [
      "Produto excelente! Atendeu todas as minhas expectativas. Qualidade excepcional e acabamento impecável. Com certeza recomendo para quem está procurando algo similar.",
      "Gostei bastante do produto. A qualidade é muito boa e o preço é justo. Recomendo a todos.",
      "Produto de qualidade. Entrega rápida e sem problemas. Recomendo.",
      "Gostei do produto. A qualidade é boa e o preço é justo. Recomendo a todos.",
    ],
  },
];

const comments = Array.from({ length: 4 }, () => commentContent[0]);

export default function Comments() {
  return (
    <div className="mt-8 space-y-2">
      <TypographyH4 className="mb-4">997 comentários</TypographyH4>

      {comments.map((comment, i) => (
        <div key={i} className="grid gap-2 max-w-screen-sm pb-6">
          <div className="flex gap-2">
            <Avatar className="w-9 h-9 bg-">
              <AvatarFallback
                className={`${comment.background[i % 4]} text-background`}
              >
                {comment.name[i % 4][0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="w-full space-y-1">
                <div className="flex gap-2 items-center">
                  <h3 className="font-medium text-sm">{comment.name[i % 4]}</h3>
                  <span className="text-xs text-muted-foreground">
                    {comment.date}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <icon.star size={10} />
                  <icon.star size={10} />
                  <icon.star size={10} />
                  <icon.star size={10} />
                  <icon.star size={10} />
                </div>
              </div>
              <div className="grid gap-2">
                <p className="text-muted-foreground text-sm">
                  {comment.text[i % 4]}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
