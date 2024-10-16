package ar.nic.security.model;

public enum UserStatusEnum {
    CREATED(1),
    ACTIVATED(2);

    final int databaseStatus;

    UserStatusEnum(int status) {
        this.databaseStatus = status;
    }

    public int getDatabaseStatusId(){
        return this.databaseStatus;
    }
}
