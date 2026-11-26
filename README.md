# WarScripts
Independent WarLike language toolchain. WS01 provides a lexer only; parser, type checking, compiler and engine migration are future milestones. No existing engine runtime is replaced.

Run `npm test` with Node 22.

## WS02 — Parser and abstract syntax tree
`parse(source)` returns an AST for primitive declarations, functions, classes, expressions, loops and conditionals. No type checking, execution, constructors or compiler yet.
