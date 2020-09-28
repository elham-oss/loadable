import { ParserInitializer } from '../parser.initializer';
import { AbstractParser } from '../parser';

export function getAppInitializer(p: ParserInitializer, parser: AbstractParser): any {
  return p.generateInitializer(parser).bind(p);
}
