import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';
import { BoardsModule } from './modules/boards/boards.module';
import { ListsModule } from './modules/lists/lists.module';
import { CardsModule } from './modules/cards/cards.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsGateway } from './events/event.gateway';
import { EventsModule } from './events/event.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Loads .env file
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Mollokapi1', // <--- Your Password here
      database: 'taskflow',
      autoLoadEntities: true,
      synchronize: true, // TRUE for dev only (creates tables automatically)
      logging: true,
    }),
    EventEmitterModule.forRoot(),
    EventsModule,
    UsersModule,
    AuthModule,
    WorkspacesModule,
    BoardsModule,
    ListsModule,
    CardsModule,
  ],
  providers: [],
  exports: [],
  controllers: [],
})
export class AppModule {}
