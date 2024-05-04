import {Button} from '../../../components/ui/button'
import { FaRegHeart } from 'react-icons/fa';

export default function AddToCartButton() {
    return (
        <div className="flex gap-4 w-full">
        <Button className="font-bold tracking-wide px-12" size="xl">
          Adicionar ao carrinho
        </Button>
        <Button
          className="flex gap-2 border-2 hover:border-zinc-900"
          size="xl"
          variant="outline"
        >
          <FaRegHeart size={20} />
        </Button>
      </div>
    )
}